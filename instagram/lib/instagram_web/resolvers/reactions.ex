defmodule InstagramWeb.Resolvers.Reactions do
    alias Instagram.Reactions

    def like_photo(_, %{photo_id: photo_id}, %{context: %{current_user: current_user}}) do
        with {:ok, status} <- Reactions.like_photo(photo_id, current_user.id) do
            {:ok, status}
        end
    end

    def viewer_like_photo(%{id: id}, _, %{context: %{current_user: current_user}}) do
         with {:ok, status} <- Reactions.viewer_like_photo(id, current_user.id) do
            {:ok, status}
        end
    end
end
   