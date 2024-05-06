import json
import markdown

WORKING_DIRECTORY = '/Users/sophiasharif/Desktop/projects/blog/website-contents'

def get_object_data(lines: list[str]) -> list[list[str]]:
    # object data is a list of lists, where each list contains the lines of a single object
    objects = []
    current_object = []
    for line in lines:
        if line.strip() == '':
            if current_object:
                objects.append(current_object)
                current_object = []
        else:
            current_object.append(line)
    
    if current_object:
        objects.append(current_object)
    
    return objects

def process_string(line: str):
    attribute, value = line.split(':')
    return attribute.strip(), value.strip()

def process_string_list(line: str):
    attribute, value = line.split(':')
    return attribute.strip(), [item.strip() for item in value.split(';')]

def process_file_data(filename, object_processor):
    # read from <filename.md> and write to <filename.json>
    with open(f"{WORKING_DIRECTORY}/{filename}.md", 'r') as f:
        lines = f.readlines()
        object_data = get_object_data(lines)
    data = [object_processor(o) for o in object_data]
    with open(f"{WORKING_DIRECTORY}/{filename}.json", 'w') as f:
        json.dump(data, f, indent=2)

def process_markdown_lines_to_html(lines: list[str]) -> str:
    # process markdown lines to html with markdown library
    md = ''.join(lines)
    html = markdown.markdown(md)
    return html

# STATUS.MD SPECIFIC FUNCTIONS

def process_status_object(object_lines: list[str]) -> dict:
    # status object has a 'title' and 'data attribute
    if len(object_lines) != 2:
        raise ValueError(f'Invalid status object: {object_lines}')
    
    attr, type = process_string(object_lines[0])
    if attr != 'title':
        raise ValueError(f'Invalid status object: {object_lines}')
    
    attr, data = process_string_list(object_lines[1])
    finalized_data = []
    for item in data:
        try:
            item_title, item_description = item.split('(')

            item_description = item_description[:-1]
            finalized_data.append({
                'title': item_title.strip(),
                'description': item_description.strip()
            })
        except ValueError:
            raise ValueError(f'Invalid data object: {item}')
    if attr != 'data':
        raise ValueError(f'Invalid status object: {object_lines}')
    return {
        'type': type,
        'data': finalized_data
    }

# TIME.MD SPECIFIC FUNCTIONS

def process_time_object(object_lines: list[str]) -> dict:

    attr, event = process_string(object_lines[0])
    if attr != 'event':
        raise ValueError(f'Invalid event: {object_lines}')
    
    attr, date = process_string(object_lines[1])
    if attr != 'date':
        raise ValueError(f'Invalid date: {object_lines}')

    if object_lines[2].strip() != 'description:' or object_lines[3].strip() != '[' or object_lines[-1].strip() != ']':
        raise ValueError(f'Invalid description: {object_lines}')
    description_markdown = process_markdown_lines_to_html(object_lines[4:-1])
    
    return {
        'event': event,
        'date': date,
        'description': description_markdown
    }

# BIO.MD SPECIFIC FUNCTIONS

def process_bio_object(object_lines: list[str]) -> dict:
    attr, bio = process_string(object_lines[0])
    if attr != 'bio':
        raise ValueError(f'Invalid bio object: {object_lines}')
    return {
        'bio': bio,
    }


process_file_data('status', process_status_object)
process_file_data('timeline', process_time_object)
process_file_data('bio', process_bio_object)
print("Data processed successfully!")

