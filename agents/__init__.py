# agents/__init__.py

# Relative imports to expose classes at the package level
from .architect import ArchitectAgent
from .librarian import LibrarianAgent
from .multimodal import MultimodalSpecialist

# Define __all__ to control what is exported during 'from agents import *'
__all__ = ["ArchitectAgent", "LibrarianAgent", "MultimodalSpecialist"]