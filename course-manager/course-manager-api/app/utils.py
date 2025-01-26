def format_validation_errors(errors):
    formatted_errors = {}
    for error in errors:
        field_name = ".".join(map(str, error["loc"][1:]))
        formatted_errors[field_name] = {"message": error["msg"]}
    return formatted_errors
