# wedding-line-app

## overview

a API to process LINE messagin api webhook.
This project will be deployed to the GAS project.


## content

- src 
  - line-messaging-api
    - store scrpts related to the LINE messaging api
  - model
    - store data model
  - triggers
    - store trigger scrpts like doPost method in GAS
  - environment.ts
    - store environment variable
  - appscript.json
    - the configuration file for the GAS project
- .clasp.json
  - the configuration file for the clasp command
  - set the GAS project here
- deploy.sh
  - command list to deploy the scrpts to the GAS project
  - set the deploy version here.