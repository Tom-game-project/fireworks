import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

img=Image.new("RGB",(5,5),(255, 0, 200))

img.save("public\sprite.png")