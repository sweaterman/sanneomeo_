drop schema if exists `sanneomeo`;
create schema `sanneomeo` default character set utf8 collate utf8_bin;
use `sanneomeo`;

CREATE TABLE `tbl_mountain` (
	`mountain_seq`	VARCHAR(10)	NOT NULL,
	`latitude`	DECIMAL(18,10)	NULL,
	`longitude`	DECIMAL(18,10)	NULL,
	`altitude`	DECIMAL(18,10)	NULL,
	`si`	VARCHAR(20)	NULL,
	`gu`	VARCHAR(20)	NULL,
	`dong`	VARCHAR(20)	NULL,
	`name`	VARCHAR(50)	NULL,
	`img`	VARCHAR(30)	NULL,
	`introduction`	VARCHAR(1500)	NULL,
	`difficulty`	VARCHAR(8)	NULL
);


CREATE TABLE `tbl_trail` (
	`trail_seq`	BIGINT	NOT NULL,
	`mountain_seq`	VARCHAR(10)	NOT NULL,
	`no`	INT	NULL	DEFAULT 0,
	`name`	VARCHAR(50)	NULL,
	`introduction`	VARCHAR(500)	NULL,
	`length`	DECIMAL(5,2)	NULL,
	`difficulty`	VARCHAR(8)	NULL,
	`uptime`	INT	NULL,
	`downtime`	INT	NULL,
	`risk`	VARCHAR(200)	NULL,
	`recomand`	VARCHAR(1)	NULL,
	`best_trail`	BIGINT	NULL
);

CREATE TABLE `tbl_record_photo` (
	`record_photo_seq`	BIGINT	NOT NULL,
	`record_seq`	BIGINT	NOT NULL,
	`image`	TEXT	NULL,
	`latitude`	DECIMAL(18,10)	NULL,
	`longitude`	DECIMAL(18,10)	NULL,
	`is_public`	TINYINT(1)	NULL	DEFAULT FALSE,
	`created_at`	DATETIME	NULL
);

CREATE TABLE `tbl_user` (
	`user_seq`	BIGINT	NOT NULL,
	`nickname`	VARCHAR(50)	NULL,
	`gender`	VARCHAR(1)	NULL	COMMENT 'F/M/O',
	`age`	INT	NULL,
	`si`	VARCHAR(20)	NULL,
	`gu`	VARCHAR(20)	NULL,
	`dong`	VARCHAR(20)	NULL,
	`latitude`	DECIMAL(18,10)	NULL,
	`longitude`	DECIMAL(18,10)	NULL,
    `level`	INT	NULL,
    `difficulty`	INT	NULL,
    `prefer_region`	INT	NULL,
	`purpose`	INT	NULL,
	`prefer_climb_duration`	INT	NULL,
	`social`	VARCHAR(10)	NULL,
	`social_id`	VARCHAR(30)	NULL,
	`total_duration`	VARCHAR(100)	NULL	DEFAULT 0,
	`total_distance`	VARCHAR(100)	NULL	DEFAULT 0,
	`total_number`	INT	NULL	DEFAULT 0,
	`profile_image`	TEXT	NULL,
	`created_at`	DATETIME	NULL,
	`updated_at`	DATETIME	NULL
);

CREATE TABLE `tbl_record` (
	`record_seq`	BIGINT	NOT NULL,
	`trail_seq`	BIGINT	NOT NULL,
	`user_seq`	BIGINT	NOT NULL,
	`duration`	VARCHAR(100)	NULL,
	`review`	VARCHAR(500)	NULL,
	`rate`	INT	NULL,
	`created_at`	DATETIME	NULL
);

CREATE TABLE `tbl_trail_path` (
	`path_seq`	BIGINT	NOT NULL,
	`trail_seq`	BIGINT	NOT NULL,
	`latitude`	DECIMAL(18,10)	NULL,
	`longitude`	DECIMAL(18,10)	NULL,
	`altitude`	DECIMAL(18,10)	NULL
);

CREATE TABLE `tbl_keep` (
	`keep_seq`	BIGINT	NOT NULL,
	`user_seq`	BIGINT	NOT NULL,
	`mountain_seq`	VARCHAR(10)	NOT NULL,
	`created_at`	DATETIME	NULL
);

CREATE TABLE `tbl_mountain_spot` (
	`spot_seq`	BIGINT	NOT NULL,
	`mountain_seq`	VARCHAR(10)	NOT NULL,
	`code`	VARCHAR(10)	NULL,
	`name`	VARCHAR(50)	NULL,
	`introduction`	VARCHAR(500)	NULL,
	`etc`	VARCHAR(200)	NULL,
	`latitude`	DECIMAL(18,10)	NULL,
	`longitude`	DECIMAL(18,10)	NULL
);

-- tbl_mountainpk
ALTER TABLE `tbl_mountain` ADD CONSTRAINT `PK_TBL_MOUNTAIN` PRIMARY KEY (
	`mountain_seq`
);

ALTER TABLE `tbl_trail` ADD CONSTRAINT `PK_TBL_TRAIL` PRIMARY KEY (
	`trail_seq`
);
ALTER TABLE `tbl_trail` MODIFY `trail_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_record_photo` ADD CONSTRAINT `PK_TBL_RECORD_PHOTO` PRIMARY KEY (
	`record_photo_seq`
);
ALTER TABLE `tbl_record_photo` MODIFY `record_photo_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_user` ADD CONSTRAINT `PK_TBL_USER` PRIMARY KEY (
	`user_seq`
);
ALTER TABLE `tbl_user` MODIFY `user_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_record` ADD CONSTRAINT `PK_TBL_RECORD` PRIMARY KEY (
	`record_seq`
);
ALTER TABLE `tbl_record` MODIFY `record_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_trail_path` ADD CONSTRAINT `PK_TBL_TRAIL_PATH` PRIMARY KEY (
	`path_seq`
);
ALTER TABLE `tbl_trail_path` MODIFY `path_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_keep` ADD CONSTRAINT `PK_TBL_KEEP` PRIMARY KEY (
	`keep_seq`
);
ALTER TABLE `tbl_keep` MODIFY `keep_seq` BIGINT AUTO_INCREMENT;

ALTER TABLE `tbl_mountain_spot` ADD CONSTRAINT `PK_TBL_MOUNTAIN_SPOT` PRIMARY KEY (
	`spot_seq`
);
ALTER TABLE `tbl_mountain_spot` MODIFY `spot_seq` BIGINT AUTO_INCREMENT;

-- fk
ALTER TABLE `tbl_trail` ADD CONSTRAINT `FK_tbl_mountain_TO_tbl_trail_1` FOREIGN KEY (
	`mountain_seq`
)
REFERENCES `tbl_mountain` (
	`mountain_seq`
);

ALTER TABLE `tbl_record_photo` ADD CONSTRAINT `FK_tbl_record_TO_tbl_record_photo_1` FOREIGN KEY (
	`record_seq`
)
REFERENCES `tbl_record` (
	`record_seq`
);

ALTER TABLE `tbl_record` ADD CONSTRAINT `FK_tbl_trail_TO_tbl_record_1` FOREIGN KEY (
	`trail_seq`
)
REFERENCES `tbl_trail` (
	`trail_seq`
);

ALTER TABLE `tbl_record` ADD CONSTRAINT `FK_tbl_user_TO_tbl_record_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
);

ALTER TABLE `tbl_trail_path` ADD CONSTRAINT `FK_tbl_trail_TO_tbl_trail_path_1` FOREIGN KEY (
	`trail_seq`
)
REFERENCES `tbl_trail` (
	`trail_seq`
);

ALTER TABLE `tbl_keep` ADD CONSTRAINT `FK_tbl_user_TO_tbl_keep_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
);

ALTER TABLE `tbl_keep` ADD CONSTRAINT `FK_tbl_mountain_TO_tbl_keep_1` FOREIGN KEY (
	`mountain_seq`
)
REFERENCES `tbl_mountain` (
	`mountain_seq`
);

ALTER TABLE `tbl_mountain_spot` ADD CONSTRAINT `FK_tbl_mountain_TO_tbl_mountain_spot_1` FOREIGN KEY (
	`mountain_seq`
)
REFERENCES `tbl_mountain` (
	`mountain_seq`
);

-- created_at, updated_at 트리거 생성
CREATE TRIGGER tbl_user_create BEFORE INSERT ON `tbl_user` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_user_update BEFORE UPDATE ON `tbl_user` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_keep_create BEFORE INSERT ON `tbl_keep` FOR EACH ROW SET NEW.created_at = NOW();

CREATE TRIGGER tbl_record_create BEFORE INSERT ON `tbl_record` FOR EACH ROW SET NEW.created_at = NOW();

CREATE TRIGGER tbl_record_photo_create BEFORE INSERT ON `tbl_record_photo` FOR EACH ROW SET NEW.created_at = NOW();
