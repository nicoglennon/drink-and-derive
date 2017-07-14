get '/calculations' do

end

post '/calculations' do
  # encode the expression for URL
  expression_no_white_spaces = params[:expression].gsub(/\s+/, "")
  # p expression_no_white_spaces
  expression_parse_for_division = expression_no_white_spaces.gsub(/\//, "(over)")
  # p expression_parse_for_division
  enc_expression = URI.escape(expression_parse_for_division)
  operation = params[:operation]
  url = "https://newton.now.sh/#{operation}/#{enc_expression}"
  response = HTTParty.get(url)
  @result = response.parsed_response

  name = ["spotted%20cow", "fat%20tire", "brooklyn%20lager"].sample

  url = "http://api.brewerydb.com/v2/beers/?key=#{ENV['BREWERYBD_KEY']}&name=#{name}&order=random&randomCount=1"
  response = HTTParty.get(url)
  puts response
  @beer = response
  erb :'index'


  if request.xhr?
    # something
    p "HELLO"
    content_type :json
    {
      expression: @result["expression"],
      result: @result["result"],
      beer: @beer["data"][0]["name"],
      description: @beer["data"][0]["description"]
    }.to_json
  else
    erb :'index'
  end
end
