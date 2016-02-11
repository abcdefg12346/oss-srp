SELECT "invGroups"."groupID", "invGroups"."groupName" FROM "invGroups"
LEFT JOIN "invCategories" ON ("invGroups"."categoryID" = "invCategories"."categoryID")
WHERE "invCategories"."categoryName" = 'Ship' 
