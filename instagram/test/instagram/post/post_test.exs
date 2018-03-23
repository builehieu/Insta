defmodule Instagram.PostTest do
  use Instagram.DataCase

  alias Instagram.Post

  describe "photos" do
    alias Instagram.Post.Photo

    @valid_attrs %{caption: "some caption", image_url: "some image_url"}
    @update_attrs %{caption: "some updated caption", image_url: "some updated image_url"}
    @invalid_attrs %{caption: nil, image_url: nil}

    def photo_fixture(attrs \\ %{}) do
      {:ok, photo} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Post.create_photo()

      photo
    end

    test "list_photos/0 returns all photos" do
      photo = photo_fixture()
      assert Post.list_photos() == [photo]
    end

    test "get_photo!/1 returns the photo with given id" do
      photo = photo_fixture()
      assert Post.get_photo!(photo.id) == photo
    end

    test "create_photo/1 with valid data creates a photo" do
      assert {:ok, %Photo{} = photo} = Post.create_photo(@valid_attrs)
      assert photo.caption == "some caption"
      assert photo.image_url == "some image_url"
    end

    test "create_photo/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Post.create_photo(@invalid_attrs)
    end

    test "update_photo/2 with valid data updates the photo" do
      photo = photo_fixture()
      assert {:ok, photo} = Post.update_photo(photo, @update_attrs)
      assert %Photo{} = photo
      assert photo.caption == "some updated caption"
      assert photo.image_url == "some updated image_url"
    end

    test "update_photo/2 with invalid data returns error changeset" do
      photo = photo_fixture()
      assert {:error, %Ecto.Changeset{}} = Post.update_photo(photo, @invalid_attrs)
      assert photo == Post.get_photo!(photo.id)
    end

    test "delete_photo/1 deletes the photo" do
      photo = photo_fixture()
      assert {:ok, %Photo{}} = Post.delete_photo(photo)
      assert_raise Ecto.NoResultsError, fn -> Post.get_photo!(photo.id) end
    end

    test "change_photo/1 returns a photo changeset" do
      photo = photo_fixture()
      assert %Ecto.Changeset{} = Post.change_photo(photo)
    end
  end
end
