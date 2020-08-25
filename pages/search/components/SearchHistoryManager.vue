<script>

import HistoryState from './historyState.js';

import { isEmpty } from 'lodash';

export default {
    methods: {
        updateHistoryState() {
            this.$router.replace({
                path: '/',
                query: HistoryState.toGETParameters(this.historyStateObjects)
            }).catch(err => {});
        },

        applyStateChange(event) {
            let GETparameters = this.$route.query;

            HistoryState.deleteInvalidGETParameters(GETparameters);
            if (isEmpty(GETparameters)) {
                this.resetState();
                return;
            }

            this.historyStateObject = HistoryState.fromGETParameters(GETparameters);
            
            this.updateHistoryState();
        },
    }
}
</script>