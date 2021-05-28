# Heroku hosting setup
terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

variable "app_name" {
  description = "Name of the Heroku app to be provisioned"
}

resource "heroku_app" "website" {
  name   = var.app_name
  region = "eu"
  stack  = "container"
}

# Build code & release to the app
resource "heroku_build" "website" {
  app        = heroku_app.website.name
  buildpacks = ["https://github.com/heroku/heroku-buildpack-nodejs"]

  source {
    path = "../app/"
  }
}

# Scaling the app using a formation
# WARNING: Heroku billing must be active
# resource "heroku_formation" "website" {
#  app        = heroku_app.website.name
#  type       = "web"
#  quantity   = 1
#  size       = "Standard-1x"
#  depends_on = [heroku_build.website]
#}
