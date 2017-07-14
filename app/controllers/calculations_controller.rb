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
  if request.xhr?
    # something
    p "HELLO"
    content_type :json
    {
      expression: @result["expression"],
      result: @result["result"]
    }.to_json
  else
    erb :'index'
  end
end
