// groups here reflect the graphql definition as in https://github.com/proscholy/api.proscholy.cz/blob/development/graphql/tag.graphql#L32
// however, for the purpose of elasticsearch filtering in buildElasticSearchParams.js, exact group names are *not* necessary

export default function(tags_groups = {
    liturgy_part: [],
    liturgy_period: [],
    generic: [],
    saints: [],
    history_period: [],
    instrumentation: [],
    genre: [],
    musical_form: [],
}, 
    selected_tags = {}
) {
    return Object.values(tags_groups).map(
        group =>
            group.map(tag => tag.id).filter(tag_id => selected_tags[tag_id])
    );
}