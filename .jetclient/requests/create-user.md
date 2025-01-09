```toml
name = '/create-user'
method = 'POST'
url = 'https://mi089ark7i.execute-api.eu-west-1.amazonaws.com/dev/create-task'
sortWeight = 2000000
id = 'a1716e92-193d-4273-83d0-3c76740aff40'

[auth]
type = 'NO_AUTH'

[body]
type = 'JSON'
raw = '''
{
  "name": "joe",
  "something": "hi there"
}'''
```
