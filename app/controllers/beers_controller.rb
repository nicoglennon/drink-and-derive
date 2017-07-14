get '/beers' do
  name = ["spotted%20cow", "fat%20tire", "brooklyn%20lager"].sample

  url = "http://api.brewerydb.com/v2/beers/?key=d0a40e4ae5361ed449cc06e0a2953efd&name=#{name}&order=random&randomCount=1"
  response = HTTParty.get(url)
  puts response
  @beer = response
  erb :'index'
end
