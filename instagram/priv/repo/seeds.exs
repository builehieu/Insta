import Integer, only: [is_odd: 1]

alias Instagram.{Posts, Repo, Accounts}

mock_photos = 9
mock_users = 5

photos_list= [
    "https://cdn.dribbble.com/users/25514/screenshots/4337913/iterable-illustration-skething_1x.png",
    "https://cdn.dribbble.com/users/78464/screenshots/4337804/gr_h_800x600_1x.jpg",
    "https://cdn.dribbble.com/users/31752/screenshots/4340035/biking_1x.jpg",
    "https://cdn.dribbble.com/users/78594/screenshots/4338625/all-seeying-eye_1x.png",
    "https://cdn.dribbble.com/users/59947/screenshots/4338433/muti_dribbble-800x600_1x.jpg",
    "https://cdn.dribbble.com/users/501822/screenshots/4338428/dribbble.gif",
    "https://cdn.dribbble.com/users/952958/screenshots/4337844/play3_1x.png",
    "https://cdn.dribbble.com/users/3460/screenshots/4339540/decline.gif",
    "https://cdn.dribbble.com/users/1558435/screenshots/4337906/1x_1x.png"
]

# User
for idx <- 1..mock_users do
   sex = if (is_odd(idx)), do: "men", else: "women"
   avatar = "https://randomuser.me/api/portraits.#{sex}/#{idx}.jpg"
   %Accounts.User{
       email: Faker.Internet.email,
       avatar: avatar,
       username: Faker.Internet.user_name,
       first_name: Faker.Name.first_name,
       last_name: Faker.Name.last_name,
       facebook_id: "#{idx}",
    }
    |> Repo.insert!
end

#Photo
for idx <- 0..mock_photos do
    photo =%{
        image_url: Enum.at(photos_list,idx),
        caption: Faker.Lorem.Shakespeare.hamlet,
        user_id: Enum.random(1..mock_users)
    }

    %Posts.Photo{}
    |>Posts.Photo.changeset(photo)
    |>Repo.insert!    

end