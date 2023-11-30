export function getErrorlist(errors) {
    var errormessages = []
    errors.errors.map((element) => {
        errormessages.push({ msg: element.msg, param: element.param })
    })
    return errormessages
}