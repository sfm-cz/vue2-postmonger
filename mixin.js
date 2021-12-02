import Postmonger from 'postmonger';
import axios from 'axios';
const pm = new Postmonger.Session()
const { on, trigger } = pm;

export default {
    data() {
        return {
            activity: null,
            interaction: null,
            tokens: {
                token: '',
                fuel2token: '',
            },
            entepriseId: '',
            mid: '',
            userId: '',
            deid: '',
            routes: {
                auth: '/ui/auth',
            },
            button: {
                button: 'next',
                text: 'done',
                visible: true,
                enabled: true,
            },
            schema: null,
            dataSource: null,
            registeredAllowedOriginResponse: null,
            interactionGoalStats: null,
            activityPermissions: null,
            engineSettings: null,
            dataLibrarySource: null,
            contactsSchema: null,
            expressionBuilderAttributes: null,
            userTimeZone: null,
            entryEventDefinitionKey: null,
            i18nConfig: null,
            activityPayload: null,
        }
    },
    computed: {
        eventDefinitionKey() {
            return this.interaction && this.interaction.triggers[0] && this.interaction.triggers[0].metaData
            ? this.interaction.triggers[0].metaData.eventDefinitionKey 
            : null;
        },
    },
    mounted() {
        console.log('start trigger ready')
        trigger('ready');
        
        try {
            const tokenPromise = new Promise((resolve) => {
                this.requestTokens().then(() => {
                    this.checkAuthToken(this.tokens.fuel2token).then(({result}) => {
                        this.mid = result.organization.id;
                        this.enterpiseId = result.enterprise.id;
                        this.userId = result.user.id;
                
                        resolve();
                    })
                })   
            });

            Promise.all([
                tokenPromise,
                this.requestEventDefinitionID(),
                this.initActivity(), 
                this.requestInteraction()
            ]).then(() => this.loaded())
            .catch((err) => console.error('Received error while loading postmonger', err))

        } catch(err) {
            console.error('Received error while loading postmonger', err)
        }
        
    },
    methods: {
        updateButton() {
            return new Promise(() => {
                trigger('updateButton', this.button);
            });
        },
        requestSchema() {
            return new Promise((resolve) => {
                trigger('requestSchema');
                on('requestedSchema', (data) => {
                    this.schema = data.schema;
                    resolve(data.schema);
                });
                // timer and reject
            });
        },
        requestTokens() {
            return new Promise((resolve) => {
                trigger('requestTokens');
                on('requestedTokens', (tokens) => {
                    this.tokens.token = tokens.token;
                    this.tokens.fuel2token = tokens.fuel2token;
                    resolve(tokens);
                });
                // timer and reject
            });
        },
        requestEventDefinitionID() {
            return new Promise((resolve) => {
                trigger('requestTriggerEventDefinition');
                on('requestedTriggerEventDefinition', (eventDefinition) => {
                    if(eventDefinition && eventDefinition.dataExtensionId) {
                        this.deid = eventDefinition.dataExtensionId;
                    }
                    resolve(eventDefinition);
                })
            })
        },
        requestTriggerEventDefinition() {
            return new Promise((resolve) => {
                trigger('requestTriggerEventDefinition');
                on('requestedTriggerEventDefinition', (eventDefinition) => {
                    if(eventDefinition && eventDefinition.dataExtensionId) {
                        this.deid = eventDefinition.dataExtensionId;
                    }
                    resolve(eventDefinition);
                })
            })
        },
        requestInteraction() {  
            return new Promise((resolve) => {
                trigger('requestInteraction');
                on('requestedInteraction', (interaction) => {
                    this.interaction = interaction;
                    resolve(interaction);
                });
                // timer and reject
            });
        },
        initActivity() {
            return new Promise((resolve) => {
                on('initActivity', (activity) => {
                    this.activity = activity;
                    resolve(activity);
                });
                // timer and reject
            })
        },
        update() {
            trigger('updateActivity', this.activity);
        },
        updateActivity() {
            trigger('updateActivity', this.activity);
        },
        onClickedNext(callback) {
            on('clickedNext', callback);
        },
        onClickedBack(callback) {
            on('clickedBack', callback);
        },
        onGoToStep(callback) {
            on('gotoStep', callback);
        },
        nextStep() {
            trigger('nextStep');
        },
        previousStep() {
            trigger('prevStep');
        },
        prevStep() {
            trigger('prevStep');
        },
        requestDataSources() {  
            return new Promise((resolve) => {
                trigger('requestDataSources');
                on('requestedDataSources', (data) => {
                    this.dataSource = data;
                    resolve(data);
                });
            });
        },
        registerAllowedOriginResponse() {
            return new Promise((resolve) => {
                trigger('registerAllowedOriginResponse');
                on('registeredAllowedOriginResponse', (data) => {
                    this.registeredAllowedOriginResponse = data;
                    resolve(data);
                });
            });
        },
        requestInteractionGoalStats() {
            return new Promise((resolve) => {
                trigger('requestInteractionGoalStats');
                on('requestedInteractionGoalStats', (data) => {
                    this.interactionGoalStats = data;
                    resolve(data);
                });
            });
        },
        requestActivityPermissions() {
            return new Promise((resolve) => {
                trigger('requestActivityPermissions');
                on('requestedActivityPermissions', (data) => {
                    this.activityPermissions = data;
                    resolve(data);
                });
            });
        },
        requestEngineSettings() {
            return new Promise((resolve) => {
                trigger('requestEngineSettings');
                on('requestedEngineSettings', (data) => {
                    this.engineSettings = data;
                    resolve(data);
                });
            });
        },
        requestDataLibrarySource() {
            return new Promise((resolve) => {
                trigger('requestDataLibrarySource');
                on('requestedDataLibrarySource', (data) => {
                    this.dataLibrarySource = data;
                    resolve(data);
                });
            });
        },
        requestContactsSchema() {
            return new Promise((resolve) => {
                trigger('requestContactsSchema');
                on('requestedContactsSchema', (data) => {
                    this.contactsSchema = data;
                    resolve(data);
                });
            });
        },
        requestExpressionBuilderAttributes() {
            return new Promise((resolve) => {
                trigger('requestExpressionBuilderAttributes');
                on('requestedExpressionBuilderAttributes', (data) => {
                    this.expressionBuilderAttributes = data;
                    resolve(data);
                });
            })
        },
        requestUserTimeZone() {
            return new Promise((resolve) => {
                trigger('requestUserTimeZone');
                on('requestedUserTimeZone', (data) => {
                    this.userTimeZone = data;
                    resolve(data);
                });
            })
        },
        requestEntryEventDefinitionKey() {
            return new Promise((resolve) => {
                trigger('requestEntryEventDefinitionKey');
                on('requestedEntryEventDefinitionKey', (data) => {
                    this.entryEventDefinitionKey = data;
                    resolve(data);
                });
            })
        },
        requestI18nConfig() {
            return new Promise((resolve) => {
                trigger('requestI18nConfig');
                on('requestedI18nConfig', (data) => {
                    this.i18nConfig = data;
                    resolve(data);
                });
            })
        },
        requestActivityPayload() {
            return new Promise((resolve) => {
                trigger('requestActivityPayload');
                on('requestedActivityPayload', (data) => {
                    this.activityPayload = data;
                    resolve(data);
                });
            })
        },
        destroy() {
            trigger('destroy');
        },
        async checkAuthToken(token) {
            if(this.routes.checkAuth) {
                const { data } = await axios.post(this.routes.auth, { token });
                return data;
            } else {
                return {
                    organization: {
                        id: 0
                    },
                    enterpise: {
                        id: 0,
                    },
                    user: {
                        id: 0
                    }
                }
            }
           
        }
    }
}
