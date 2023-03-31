# python을 이용한 크롤링+전처리(의석)

1. **test라는 DB(혹은 스키마)를 미리 만들어주세요**

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`tbl_trail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`tbl_trail` (
  `trail_seq` BIGINT NOT NULL AUTO_INCREMENT,
  `montain_seq` VARCHAR(10) NOT NULL,
  `no` INT NULL DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `introduction` VARCHAR(500) NULL DEFAULT NULL,
  `length` DECIMAL(5,2) NULL DEFAULT NULL,
  `difficulty` VARCHAR(8) NULL DEFAULT NULL,
  `uptime` INT NULL DEFAULT NULL,
  `downtime` INT NULL DEFAULT NULL,
  `risk` VARCHAR(200) NULL DEFAULT NULL,
  `recomand` VARCHAR(1) NULL DEFAULT NULL,
  `best_trail` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`trail_seq`))
ENGINE = InnoDB
AUTO_INCREMENT = 222
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `test`.`tbl_trail_path`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`tbl_trail_path` (
  `path_seq` BIGINT NOT NULL AUTO_INCREMENT,
  `latitude` DECIMAL(18,10) NULL DEFAULT NULL,
  `longitude` DECIMAL(18,10) NULL DEFAULT NULL,
  `altitude` DECIMAL(18,10) NULL DEFAULT NULL,
  `trail_seq` BIGINT NOT NULL,
  PRIMARY KEY (`path_seq`),
  INDEX `fk_tbl_trail_path_tbl_trail_idx` (`trail_seq` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_trail_path_tbl_trail`
    FOREIGN KEY (`trail_seq`)
    REFERENCES `test`.`tbl_trail` (`trail_seq`))
ENGINE = InnoDB
AUTO_INCREMENT = 8579
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

1. **main.py를 봐주세요**

```python
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
    os.chdir('./trail/1')
    file_names = os.listdir()
    # print(dataset.bounds)
    for filename in file_names:
        jsonToCsv_trail(filename)
        conn.commit()

    conn.close()
    print("끝났어요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")

# See PyCharm help at https://www.jetbrains.com/help/pycharm/

```

1. **다음 코드라인을 자신에게 맡게 봐꿔주세요**

```jsx
conn = pymysql.connect(host='localhost',  port=3306,user='root', password='password', db='test', charset='utf8')

```

1. **다음과 같이 로그가 나오면 성공입니다**

```sql
C:\Users\SSAFY\anaconda3\python.exe C:\Users\SSAFY\Desktop\전처리\main.py 
PMNTN_연화산투구봉_421903801.json
PMNTN_열안지오름_491102503.json
PMNTN_열안지오름_491107304.json
PMNTN_열왕산_482703101.json
```

1. **파일마다 commit 명령어를 쓰기 때문에 ‘PMNTN_열왕산_482703101.json’ 도중에 프로그램을 끈다면, 아래 파일들은 들어간 것입니다. 아래 파일들만 삭제하고, 다시 실행하시면 됩니다**

```sql
PMNTN_연화산투구봉_421903801.json
PMNTN_열안지오름_491102503.json
PMNTN_열안지오름_491107304.json
```

1. **sql파일 뽑는 방법은 mysql파일(이건 모든 파일을 입력한 후에 해주세요!!!!!!!!!!!)**
    1. 해당 명령어는 cmd로 해주세요
    2. 해당 mysqldump.exe 파일은 mysql 저장 폴더에서 bin폴더 안에 있습니다.
    3. 해당 데이테베이스가 다 뽑아오는 것이므로 주의해 주세요

```jsx
mysqldump.exe -u [사용자 계정] -p [백업하고자 하는 DB 이름] > [생성될 백업 DB 이름].sql
```

1. 환경 
    1. 해당 프로젝트에는 trail이라는 폴더가 있으며, 해당 폴더에는 json파일들이 있습니다.
    2. json 파일의 데이터는 등산로 + 좌표값들이 들어있습니다.
    3. 저희는 등산로 테이블과 좌표테이블이 1:N관계입니다.
    4. mysql에 test라는 DB와 해당 테이블들은 이미 생성된 상황입니다.
2. 과정
    1. mysql DB에 접속
    2. trail폴더에 접근 후 파일을 하나씩 open
    3. 먼저 등산로 정보를 등산로 테이블에 넣어줍니다.
    4. 그리고 좌표값들을 하나 하나 뽑습니다.
    5. 고도 데이터 또한 좌표값과 tif파일을 이용하여 얻어냅니다..
    6. 고도와 좌표값들을 좌표 테이블에 넣어줍니다.
    7. 하나의 파일을 넣으면 commit 해줍니다.
    8. 모든 파일이 다 넣어지면 ‘끝났어요’가 출력됩니다.