# hierarchy-front-end-angular
#created with angular material ui

#For run application 
---
-npm install

-ng serve

#main models
----
-Employee.model.ts

-Role.model.ts

-Permission.model.ts

#Components include 2 part that one of them see all list, other one is detail of component 
---
-employee-list.html / employee-list.ts

-employee.html/employee.ts

#services
---
-describe the back-end service url in angular environment.ts( apiURL: 'http://localhost:8080/api/v1')

-for connected with back-end used http properties of '@angular/common/http'; that presented crud statements(get,put,post,delete)

#app-routing.ts include all angular components path

#app-module.ts include ngModel declarations and imports that whatever you used in your projest as a material imports and components declarations
