import json
import yt_dlp
import sys 
# URL = 'https://www.youtube.com/watch?v=BaW_jenozKc'
import time
import hashlib
import os
args = {
    'URL': sys.argv[1],

  }
pwd = os.getcwd()
URL = args['URL']
def generate_unique_filename():
    timestamp = str(time.time())  # 获取当前时间戳
    unique_string = hashlib.md5(timestamp.encode()).hexdigest()  # 使用哈希函数生成唯一字符串
    filename = f"facebook_{unique_string}"  # 创建文件名，例如：video_1234567890.mp4
    return filename

class MyLogger:=
    def debug(self, msg):
        # For compatibility with youtube-dl, both debug and info are passed into debug
        # You can distinguish them by the prefix '[debug] '
        if msg.startswith('[debug] '):
            pass
        else:
            self.info(msg)

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)
        
        
# ℹ️ See "progress_hooks" in help(yt_dlp.YoutubeDL)
data_list = []

def my_hook(d):
    if d['status'] == 'finished':
        # print(d)
        # print('Done downloading, now post-processing ...')
        data_list.append(d)

        # 在适当的时机将列表转换为 JSON 字符串
        json_data = json.dumps(data_list)

        # 将 JSON 字符串写入到文件中
        # with open('data.json', 'w') as file:
        #     file.write(json_data)

# def end_hook(d):
    # if d['status'] == 'finished':
        # print(d)
        # print('Done all')
        # data_list.append(d)

        # # 在适当的时机将列表转换为 JSON 字符串
        # json_data = json.dumps(data_list)

        # # 将 JSON 字符串写入到文件中
        # with open('data.json', 'w') as file:
        #     file.write(json_data)
# ℹ️ See help(yt_dlp.YoutubeDL) for a list of available options and public functions

filename = generate_unique_filename()
ydl_opts = {   
    'logger': MyLogger(),
    'progress_hooks': [my_hook],
    # 'postprocessor_hooks': [end_hook],
    'version': True,
    'paths': {
        'home': '{}/src/lib/video/facebook/'.format(pwd)
    },
    'outtmpl': '{}.mp4'.format(filename),
    "verbose": True,
    'format': 'mp4'


    }
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(URL, download=False)
    duration = info.get('duration', 0)  # 获取视频时长，默认为0
    print(json.dumps(ydl.sanitize_info(info)))
    if duration < 300:
        download_info = ydl.extract_info(URL, download=True)
        print(json.dumps(ydl.sanitize_info(download_info)))

    # print("insde python {}".format(URL))
    # print('hi')
    # ℹ️ ydl.sanitize_info makes the info json-serializable)