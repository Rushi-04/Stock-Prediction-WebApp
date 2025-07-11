import os
from django.conf import settings
import matplotlib.pyplot as plt 

def save_img(plot_img_path):
    image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
    
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    
    plt.savefig(image_path, dpi=300)
    plt.close()
    return settings.MEDIA_URL + plot_img_path