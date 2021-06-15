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
            }
        }
    },
    computed: {
        eventDefinitionKey() {
            return this.interaction && this.interaction.triggers[0] && this.interaction.triggers[0].metaData
            ? this.interaction.triggers[0].metaData.eventDefinitionKey 
            : null;
        },
    },
    created() {
        trigger('ready');
        
        try {
            const tokenPromise = new Promise((resolve) => {
                this.requestTokens().then(() => {
                    checkAuthToken(this.tokens.fuel2token).then(({result}) => {
                        this.mid = result.organization.id;
                        this.enterpiseId = result.enterprise.id;
                        this.userId = result.user.id;
                
                        resolve();
                    })
                })   
            })

            Promise.all([
                tokenPromise,
                this.requestEventDefinitionID(),
                this.initActivity(), 
                this.requestInteraction()
            ]).then(() => this.loaded())

        } catch(err) {
            console.error('Received error while loading postmonger', err)
        }
        
    },
    methods: {
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
            trigger('updateActivity', this.activity)
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
        destroy() {
            trigger('destroy');
        },
        async checkAuthToken(token) {
            const { data } = await axios.post(this.routes.auth, { token });
            return data;
        }
    }
}
