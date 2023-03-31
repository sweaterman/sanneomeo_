package com.hikers.sanneomeo.domain;

import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@ToString
@Document(indexName = "mountain")
public class MountainDocument {

  @Id
  private String id;

  @Field(type = FieldType.Text)
  private String name;

  @Field(type = FieldType.Text)
  private String si;

  @Field(type = FieldType.Text)
  private String gu;

  @Field(type = FieldType.Text)
  private String dong;

  @Field(type = FieldType.Text)
  private String sequence;

  @Field(type = FieldType.Text)
  private String latitude;

  @Field(type = FieldType.Text)
  private String longitude;

}
