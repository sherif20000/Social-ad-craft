import requests
import sys
import json
import io
from datetime import datetime

class AdVantageStudioAPITester:
    def __init__(self, base_url="https://social-ad-craft-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.uploaded_file_id = None
        self.uploaded_file_path = None

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {}
        
        if not files:
            headers['Content-Type'] = 'application/json'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                if files:
                    response = requests.post(url, files=files, timeout=60)
                else:
                    response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        resp_json = response.json()
                        print(f"Response: {json.dumps(resp_json, indent=2)[:200]}...")
                        return True, resp_json
                    except:
                        print(f"Response content: {response.text[:200]}...")
                        return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:500]}")

            return success, response.json() if response.content and success else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check endpoint"""
        return self.run_test(
            "API Health Check",
            "GET",
            "",
            200
        )

    def test_file_upload(self):
        """Test file upload endpoint"""
        # Create a test image file in memory
        test_image_data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x01\x00\x00\x00\x007n\xf9$\x00\x00\x00\nIDAT\x08\x1dc\xf8\x00\x00\x00\x01\x00\x01Z\r\xc4\xeb\x00\x00\x00\x00IEND\xaeB`\x82'
        files = {'file': ('test_image.png', io.BytesIO(test_image_data), 'image/png')}
        
        success, response = self.run_test(
            "File Upload",
            "POST",
            "upload",
            200,
            files=files
        )
        
        if success and 'id' in response:
            self.uploaded_file_id = response['id']
            self.uploaded_file_path = response.get('storage_path')
            print(f"Uploaded file ID: {self.uploaded_file_id}")
            print(f"Storage path: {self.uploaded_file_path}")
        
        return success

    def test_file_serve(self):
        """Test file serving endpoint"""
        if not self.uploaded_file_path:
            print("⚠️  Skipping file serve test - no uploaded file")
            return False
            
        success, _ = self.run_test(
            "File Serve",
            "GET",
            f"files/{self.uploaded_file_path}",
            200
        )
        return success

    def test_media_list(self):
        """Test media list endpoint"""
        success, response = self.run_test(
            "Media List",
            "GET",
            "media",
            200
        )
        
        if success and isinstance(response, list):
            print(f"Found {len(response)} media files")
            for item in response[:3]:  # Show first 3 items
                print(f"- {item.get('original_filename')} ({item.get('content_type')})")
        
        return success

    def test_media_delete(self):
        """Test media deletion endpoint"""
        if not self.uploaded_file_id:
            print("⚠️  Skipping media delete test - no uploaded file")
            return False
            
        success, _ = self.run_test(
            "Media Delete",
            "DELETE",
            f"media/{self.uploaded_file_id}",
            200
        )
        return success

def main():
    print("🚀 Starting AdVantage Studio API Testing")
    print("=" * 50)
    
    # Setup
    tester = AdVantageStudioAPITester()
    
    # Run all tests in sequence
    print("\n📋 Running Backend API Tests:")
    
    # 1. Health check
    tester.test_health_check()
    
    # 2. File upload
    tester.test_file_upload()
    
    # 3. File serve (depends on upload)
    tester.test_file_serve()
    
    # 4. Media list
    tester.test_media_list()
    
    # 5. Media delete (cleanup)
    tester.test_media_delete()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"Success Rate: {success_rate:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("❌ Some backend tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())