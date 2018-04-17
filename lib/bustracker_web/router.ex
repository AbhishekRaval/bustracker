defmodule BustrackerWeb.Router do
  use BustrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BustrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/register", PageController, :index
    get "/search", PageController, :index
    get "/favourites", PageController, :index
    get "/buses/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", BustrackerWeb do
  #   pipe_through :api
  # end
end
