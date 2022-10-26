export default {
    name: 'nutritionInfo',
    title: 'NutritionInfo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'about',
            title: 'About',
            type: 'string',
        },
        {
            name: 'save',
            title: 'Save',
            type: 'array',
            of: [{ type: 'save' }]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{ type: 'comment' }]
        },

    ]
}