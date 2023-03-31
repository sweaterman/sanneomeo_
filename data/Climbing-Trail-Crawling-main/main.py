import json
import pymysql
from pyproj import Transformer
import os
import requests
import rasterio

dataset_type ="+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"
latAndLong_type ="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs "

transformer = Transformer.from_crs(dataset_type, latAndLong_type)

conn = pymysql.connect(host='localhost',  port=3306,user='ssafy', password='ssafy', db='test', charset='utf8')
cursor = conn.cursor()

dataset = rasterio.open("./wsg_tif.tif")
band1 = dataset.read(1)

def jsonToCsv_trail(file_path):
    print(file_path)
    with open(file_path, 'r',encoding="UTF8") as file:
        data = json.load(file)
        for feat in data["features"]:
            # print (feat)
            # # print(feat["attributes"]) # AI trail_seq
            MNTN_CODE = feat["attributes"]["MNTN_CODE"] # 산코드 montain_seq
            PMNTN_SN = feat["attributes"]["PMNTN_SN"]
            PMNTN_NM = feat["attributes"]["PMNTN_NM"] #  name
            PMNTN_MAIN = feat["attributes"]["PMNTN_MAIN"] #  introduction
            PMNTN_LT = feat["attributes"]["PMNTN_LT"] #  length
            PMNTN_DFFL = feat["attributes"]["PMNTN_DFFL"] #  difficulty
            PMNTN_UPPL = feat["attributes"]["PMNTN_UPPL"] #  uptime
            PMNTN_GODN = feat["attributes"]["PMNTN_GODN"] #  downtime
            PMNTN_RISK = feat["attributes"]["PMNTN_RISK"] #  risk
            PMNTN_RECO = feat["attributes"]["PMNTN_RECO"] #  recomand
            # print(feat["attributes"][""]) #  best_trail

            cursor.execute("insert into tbl_trail (`montain_seq`,`no`,`name`,`introduction`,`length`,`difficulty`,`uptime`,`downtime`,`risk`,`recomand`) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (MNTN_CODE,PMNTN_SN,PMNTN_NM,PMNTN_MAIN,PMNTN_LT,PMNTN_DFFL,PMNTN_UPPL,PMNTN_GODN,PMNTN_RISK,PMNTN_RECO))
            seq = cursor.lastrowid
            best_path_seq = 0;

            for paths in feat["geometry"]["paths"]:
                for path in paths:
                    x,y=transformer.transform(path[0],path[1])
                    # print(x,y)
                    row, col = dataset.index(x,y)
                    # print(row,col)
                    height = band1[row, col]

                    # ================ 이전 방식 시작 ===============
                    # url = f"https://api.opentopodata.org/v1/aster30m?locations={ y},{x}"  
                    # response = requests.request("GET", url, headers={}, data={})
                    # value = response.json()
                    # print(value)
                    # height = round( value["results"][0]["elevation"],10)
                    # ================ 이전 방식 끝 ===============


                    cursor.execute("insert into tbl_trail_path (`latitude`,`longitude`,`altitude`,`trail_seq`) values (%s,%s,%s,%s)",(y,x,height,seq))
                    best_path_seq = cursor.lastrowid
            cursor.execute("update tbl_trail set best_trail = %s where trail_seq = %s",(best_path_seq,seq))


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    os.chdir('./trail/4_5_6')
    file_names = os.listdir()
    # print(dataset.bounds)
    for filename in file_names:
        jsonToCsv_trail(filename)
        conn.commit()

    conn.close()
    print("끝났어요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
