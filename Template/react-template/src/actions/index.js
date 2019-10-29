// action
export default (id, target) => {
    return {
        type: 'setState',
        target,
        id
    }
};