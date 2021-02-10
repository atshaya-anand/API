from PIL import ImageFont, ImageDraw, Image
import random
import cv2
import numpy as np
import datetime
# Setting up the canvas
text = "this is "
def generate_captcha(text):
    size = random.randint(10,16)
    length = random.randint(4,8)
    img = np.zeros(((size*2)+5, length*size, 3), np.uint8)
    img_pil = Image.fromarray(img+255)
    draw = ImageDraw.Draw(img_pil)
    font = ImageFont.truetype(font = 'arial', size=16)
    draw.text((5, 10), text, font=font,fill=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))
    draw.line([(random.choice(range(length*size)), random.choice(range((size*2)+5)))
            ,(random.choice(range(length*size)), random.choice(range((size*2)+5)))]
            , width=1, fill=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))

    img = np.array(img_pil)
    thresh = random.randint(1,5)/100
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            rdn = random.random()
            if rdn < thresh:
                img[i][j] = random.randint(0,123)
            elif rdn > 1-thresh:
                img[i][j] = random.randint(123,255)
    img = cv2.blur(img,(int(size/random.randint(5,10)),int(size/random.randint(5,10))))
    #cv2.imshow(f"{text}", img)
    #cv2.waitKey()
    #cv2.destroyAllWindows()
    imgCode = str(datetime.datetime.now().time().second)
    cv2.imwrite("captcha"+imgCode+".jpg",img)
    return imgCode

generate_captcha(text)