package com.hikers.sanneomeo.repository;

import co.elastic.clients.elasticsearch.core.SearchRequest;
import com.hikers.sanneomeo.domain.MountainDocument;
import java.io.IOException;
import java.util.List;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface MountainDocumentRepository extends
    ElasticsearchRepository<MountainDocument, String> {

  //  @Query("{\"match\": {\"title\": {\"query\": \"*?0*\"}}}")
  @Query("{\"multi_match\" : {\n"
      + "        \"query\":    \"?0\", \n"
      + "        \"fields\": [ \"name^2\", \"dong\", \"gu\",\"si\" ]\n"
      + "      }\n"
      + "}")
  List<MountainDocument> searchByKey(String key);

//  List<MountainDocument> search(NativeSearchQuery nativeSearchQuery);

}