This is postmonger wrapper for Vue.js 2

Installation: 
```
npm i vue2-postmonger
```

Global install:

```
import Vue from 'vue';
import VuePostmonger from 'vue2-postmonger';

Vue.use(VuePostmonger);
```

Local installation (preffered): 

```
import VuePostmonger from 'vue2-postmonger';

export default {
    mixins: [VuePostmonger],
    data() {},
}
```

Plugin runs in mounted hook and triggers ```ready```.
Then plugin will do request to ```/ui/auth``` enpoint to get token. To change endpoint change prop in your component data:
```
data() {
    return {
        routes: {
            auth: '/ui/auth',
        },
    }
} 
```
Or set ```router.auth``` to null if you don't need to get tokens.

If initialization was successful then it runs ```this.loaded()``` method that you have to implement on your side. On this step activity is loaded and you can access majority of properties or run methods described bellow.


Behavior description of implemented postmonger methods:
1. ```updateButton()``` - update this.button and run this method to update button
2. ```requestSchema()``` - writes data to this.schema and returns it
3. ```requestTokens()``` - writes data to this.tokens.token, this.tokens.fuel2token and returns it
4. ```requestTriggerEventDefinition()``` - writes data to this.deid and returns it
5. ```requestInteraction()``` - writes data to this.interaction and returns it
6. ```initActivity()``` - writes data to this.activity and returns it
7. ```updateActivity()``` - update this.activity and run this method to update activity
8. ```onClickedNext(callback)```
9. ```onClickedBack(callback)```
10. ```onGoToStep(callback)```
11. ```nextStep()```
12. ```previousStep()```
13. ```prevStep()```
14. ```requestDataSources()``` - writes data to this.dataSource and returns it
15. ```registerAllowedOriginResponse()``` - writes data to this.registeredAllowedOriginResponse and returns it
16. ```requestInteractionGoalStats()``` - writes data to this.interactionGoalStats and returns it
17. ```requestActivityPermissions()``` - writes data to this.activityPermissions and returns it
18. ```requestEngineSettings()``` - writes data to this.engineSettings and returns it
19. ```requestDataLibrarySource()``` - writes data to this.dataLibrarySource and returns it
20. ```requestContactsSchema()``` - writes data to this.contactsSchema and returns it
21. ```requestExpressionBuilderAttributes()``` - writes data to this.expressionBuilderAttributes and returns it
22. ```requestUserTimeZone()``` - writes data to this.userTimeZone and returns it
23. ```requestEntryEventDefinitionKey()``` - writes data to this.entryEventDefinitionKey and returns it
24. ```requestI18nConfig()``` - writes data to this.i18nConfig and returns it
25. ```requestActivityPayload()``` - writes data to this.activityPayload and returns it

Author: Dmitrii Averin
