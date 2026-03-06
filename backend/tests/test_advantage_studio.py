"""
Backend API tests for AdVantage Studio
Tests: Share endpoints, Media endpoints, Root endpoint
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestRootEndpoint:
    """Test root API endpoint health"""

    def test_root_endpoint(self):
        """Test root API returns 200 with correct message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "AdVantage" in data["message"] or "API" in data["message"]
        print(f"PASS: Root endpoint working - {data}")


class TestShareEndpoints:
    """Share link creation and retrieval endpoints"""

    share_id = None

    def test_create_share_minimal(self):
        """Test POST /api/share with minimal ad data"""
        payload = {
            "brandName": "TEST_Brand",
            "caption": "This is a test caption",
            "headline": "Test Headline",
            "description": "Test description",
            "platform": "facebook",
        }
        response = requests.post(f"{BASE_URL}/api/share", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data, f"Response missing 'id': {data}"
        assert "url" in data, f"Response missing 'url': {data}"
        assert len(data["id"]) == 8, f"Expected 8-char ID, got: {data['id']}"
        assert f"/share/{data['id']}" in data["url"], f"URL format wrong: {data['url']}"

        # Store for use in next test
        TestShareEndpoints.share_id = data["id"]
        print(f"PASS: Share created with ID: {data['id']}, URL: {data['url']}")

    def test_create_share_with_full_data(self):
        """Test POST /api/share with full ad config"""
        payload = {
            "brandName": "TEST_FullBrand",
            "brandHandle": "@testbrand",
            "profileImage": "https://example.com/avatar.jpg",
            "caption": "Full caption text",
            "headline": "Full Headline",
            "description": "Full description text",
            "ctaText": "Shop Now",
            "ctaLink": "example.com",
            "mediaUrl": "",
            "mediaType": "image",
            "objective": "traffic",
            "adFormat": "single_image",
            "platform": "instagram",
            "carouselCards": []
        }
        response = requests.post(f"{BASE_URL}/api/share", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data
        assert len(data["id"]) == 8
        print(f"PASS: Full data share created with ID: {data['id']}")

    def test_get_share_by_id(self):
        """Test GET /api/share/{id} retrieves saved data"""
        if not TestShareEndpoints.share_id:
            pytest.skip("Share ID not set from previous test")

        response = requests.get(f"{BASE_URL}/api/share/{TestShareEndpoints.share_id}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data, f"Response missing 'id': {data}"
        assert data["id"] == TestShareEndpoints.share_id
        assert "ad_data" in data, f"Response missing 'ad_data': {data}"
        # Verify ad_data contains the saved content
        ad_data = data["ad_data"]
        assert "brandName" in ad_data or "caption" in ad_data, f"ad_data structure unexpected: {ad_data}"
        print(f"PASS: Share retrieved successfully: {data['id']}")

    def test_get_share_not_found(self):
        """Test GET /api/share/{id} with non-existent ID returns 404"""
        response = requests.get(f"{BASE_URL}/api/share/INVALID1")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        data = response.json()
        assert "detail" in data
        print(f"PASS: Non-existent share returns 404: {data}")

    def test_share_data_persistence(self):
        """Test that share data is actually persisted to DB - Create then GET verify"""
        unique_brand = f"TEST_Persist_{int(time.time())}"
        payload = {
            "brandName": unique_brand,
            "caption": "Persistence test caption",
            "headline": "Persistence Headline",
            "platform": "twitter",
        }
        # Create share
        create_resp = requests.post(f"{BASE_URL}/api/share", json=payload)
        assert create_resp.status_code == 200
        share_id = create_resp.json()["id"]

        # Get share and verify data
        get_resp = requests.get(f"{BASE_URL}/api/share/{share_id}")
        assert get_resp.status_code == 200
        retrieved_data = get_resp.json()
        assert retrieved_data["ad_data"]["brandName"] == unique_brand, \
            f"Brand name mismatch: expected '{unique_brand}', got '{retrieved_data['ad_data'].get('brandName')}'"
        print(f"PASS: Data persistence verified for share ID: {share_id}")


class TestMediaEndpoints:
    """Media listing endpoint tests (upload requires file, skip)"""

    def test_list_media(self):
        """Test GET /api/media returns list"""
        response = requests.get(f"{BASE_URL}/api/media")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert isinstance(data, list), f"Expected list, got: {type(data)}"
        print(f"PASS: Media list endpoint working, returned {len(data)} items")

    def test_delete_media_not_found(self):
        """Test DELETE /api/media/{id} with non-existent ID returns 404"""
        response = requests.delete(f"{BASE_URL}/api/media/nonexistent-id-123")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print(f"PASS: Delete non-existent media returns 404")
