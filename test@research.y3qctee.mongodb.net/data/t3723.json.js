window.repositoryObject = {"columns_custom_fields":[],"relations_custom_fields":[],"unique_keys_custom_fields":[],"triggers_custom_fields":[],"object_id":"t3723","name":"posts","subtype":"COLLECTION","is_user_defined":false,"description":"","summary":[{"field":"Documentation","value":{"_type":"link","name":"test@research.y3qctee.mongodb.net","id":"d6"}},{"field":"Schema","value":"test"},{"field":"Name","value":"posts"},{"field":"Type","value":"Collection"},{"field":"Module","value":[{"_type":"link","name":"ER","id":"m107"}]}],"columns":[{"id":"column-34379","object_id":"column-34379","name":"_id","name_without_path":"_id","description":"","is_pk":false,"is_identity":false,"data_type":"Id","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34380","object_id":"column-34380","name":"images","name_without_path":"images","description":"","is_pk":false,"is_identity":false,"data_type":"Null[]/Document[]","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"MIXED","is_user_defined":false,"children":[{"id":"column-34391","object_id":"column-34391","name":"images.public_id","name_without_path":"public_id","description":"","is_pk":false,"is_identity":false,"data_type":"String","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"images","level":2,"item_type":"FIELD","is_user_defined":false,"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34392","object_id":"column-34392","name":"images.url","name_without_path":"url","description":"","is_pk":false,"is_identity":false,"data_type":"String","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"images","level":2,"item_type":"FIELD","is_user_defined":false,"custom_fields":{},"linked_terms":null,"references":[]}],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34381","object_id":"column-34381","name":"likes","name_without_path":"likes","description":"","is_pk":false,"is_identity":false,"data_type":"ObjectId[]/Null[]","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"ARRAY","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[{"id":"t3724","name":"users","name_show_schema":"test.users"}]},{"id":"column-34382","object_id":"column-34382","name":"comments","name_without_path":"comments","description":"","is_pk":false,"is_identity":false,"data_type":"Null[]/ObjectId[]","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"ARRAY","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[{"id":"t3719","name":"comments","name_show_schema":"test.comments"}]},{"id":"column-34383","object_id":"column-34383","name":"content","name_without_path":"content","description":"","is_pk":false,"is_identity":false,"data_type":"String","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34384","object_id":"column-34384","name":"user","name_without_path":"user","description":"","is_pk":false,"is_identity":false,"data_type":"Id","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[{"id":"t3724","name":"users","name_show_schema":"test.users"}]},{"id":"column-34385","object_id":"column-34385","name":"createdAt","name_without_path":"createdAt","description":"","is_pk":false,"is_identity":false,"data_type":"DateTime","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34386","object_id":"column-34386","name":"updatedAt","name_without_path":"updatedAt","description":"","is_pk":false,"is_identity":false,"data_type":"DateTime","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34387","object_id":"column-34387","name":"__v","name_without_path":"__v","description":"","is_pk":false,"is_identity":false,"data_type":"Int32","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34388","object_id":"column-34388","name":"typePost","name_without_path":"typePost","description":"","is_pk":false,"is_identity":false,"data_type":"String","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34389","object_id":"column-34389","name":"dateOfPublication","name_without_path":"dateOfPublication","description":"","is_pk":false,"is_identity":false,"data_type":"DateTime","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"FIELD","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]},{"id":"column-34390","object_id":"column-34390","name":"hashtag","name_without_path":"hashtag","description":"","is_pk":false,"is_identity":false,"data_type":"String[]","data_length":null,"is_nullable":true,"computed_formula":null,"default_value":null,"path":"","level":1,"item_type":"ARRAY","is_user_defined":false,"children":[],"custom_fields":{},"linked_terms":null,"references":[]}],"relations":[{"name":"fk_comments_posts","title":"","description":"","is_user_defined":true,"foreign_table":"posts","foreign_table_show_schema":"test.posts","foreign_table_verbose":"posts","foreign_table_verbose_show_schema":"test.posts","foreign_table_object_id":"t3723","primary_table":"comments","primary_table_show_schema":"test.comments","primary_table_verbose":"comments","primary_table_verbose_show_schema":"test.comments","primary_table_object_id":"t3719","pk_cardinality":"mx","fk_cardinality":"1x","constraints":[{"primary_column_path":"","primary_column":"_id","foreign_column_path":"","foreign_column":"comments"}],"custom_fields":{}},{"name":"fk_users_posts","title":"","description":"","is_user_defined":true,"foreign_table":"posts","foreign_table_show_schema":"test.posts","foreign_table_verbose":"posts","foreign_table_verbose_show_schema":"test.posts","foreign_table_object_id":"t3723","primary_table":"users","primary_table_show_schema":"test.users","primary_table_verbose":"users","primary_table_verbose_show_schema":"test.users","primary_table_object_id":"t3724","pk_cardinality":"mx","fk_cardinality":"1x","constraints":[{"primary_column_path":"","primary_column":"_id","foreign_column_path":"","foreign_column":"likes"}],"custom_fields":{}},{"name":"fk_users_posts","title":"","description":"","is_user_defined":true,"foreign_table":"posts","foreign_table_show_schema":"test.posts","foreign_table_verbose":"posts","foreign_table_verbose_show_schema":"test.posts","foreign_table_object_id":"t3723","primary_table":"users","primary_table_show_schema":"test.users","primary_table_verbose":"users","primary_table_verbose_show_schema":"test.users","primary_table_object_id":"t3724","pk_cardinality":"1x","fk_cardinality":"mx","constraints":[{"primary_column_path":"","primary_column":"_id","foreign_column_path":"","foreign_column":"user"}],"custom_fields":{}}],"unique_keys":[{"name":"_id","description":null,"is_pk":true,"is_user_defined":false,"columns":[{"path":"","name_without_path":"_id","name":"_id"}],"custom_fields":{}}],"triggers":[],"dependencies":null,"imported_at":"2023-07-01 15:24"};