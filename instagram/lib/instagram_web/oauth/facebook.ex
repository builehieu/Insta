defmodule InstagramWeb.Oauth.Facebook do
   @fields "id,email,first_name,last_name"

   def get_info(token) do
       token
       |> get_user # user
       |> get_user_profile_picture("small", token)
       |> normalize
   end

   def get_user(token) do
       {:ok, user} = Facebook.me([fields: @fields], token)
       user
   end

   def get_user_profile_picture(user, size, token) do
       {:ok, data} = Facebook.picture(user["id"], size, token)
       [user, data]
   end

   def normalize([user, picture_data]) do
        %{
            facebook_id: user["id"],
            avatar: picture_data["data"]["url"],
            first_name: user["first_name"],
            last_name: user["last_name"],
            email: user["email"]
        }
   end
end
