SELECT "invTypes"."typeID", "invGroups"."groupID", "invGroups"."groupName", "invTypes"."typeName", "invTypes"."description" FROM "invTypes"
LEFT JOIN "invGroups" ON ("invGroups"."groupID" = "invTypes"."groupID")
LEFT JOIN "invCategories" ON ("invGroups"."categoryID" = "invCategories"."categoryID")
WHERE "invCategories"."categoryName" = 'Ship' 
