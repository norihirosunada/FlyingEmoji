require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?

get '/' do
    @title = "GoFind"
    
    erb :index
end

get '/gofind' do
    @title = "GoFind"
    
    erb :index
end

get '/party/host' do
    erb '<script src="/assets/js/party_host.js"></script>'
end

get '/party/client' do
    erb :party_client
end