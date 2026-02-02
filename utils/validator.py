import httpx
import asyncio
from typing import List, Dict

class LinkValidator:
    def __init__(self, timeout: float = 5.0):
        # 5.0s is a respectful balance for 2026 web standards
        self.timeout = httpx.Timeout(timeout)
        self.headers = {
            "User-Agent": "The-Learning-Engine-Validator/1.0 (CS-Student-Project)"
        }

    async def is_reachable(self, url: str) -> bool:
        """
        Performs a surgical HEAD request to verify link health.
        """
        async with httpx.AsyncClient(timeout=self.timeout, headers=self.headers) as client:
            try:
                # We use HEAD to save bandwidth and time
                response = await client.head(url, follow_redirects=True)
                
                # A 200 OK or 3xx Redirect is considered 'Healthy'
                return response.status_code < 400
            except (httpx.RequestError, httpx.TimeoutException):
                # If the site is down or times out, it's 'Unhealthy'
                return False

    async def validate_resource_list(self, resources: List[Dict]) -> List[Dict]:
        """
        Filters a list of Librarian resources, removing dead links.
        """
        valid_resources = []
        
        # We run these checks in parallel for maximum speed
        tasks = [self.is_reachable(res["url"]) for res in resources]
        results = await asyncio.gather(*tasks)

        for resource, is_valid in zip(resources, results):
            if is_valid:
                valid_resources.append(resource)
                
        return valid_resources

# Simple usage test:
#validator = LinkValidator()
#healthy = asyncio.run(validator.is_reachable("https"))
#print(healthy)