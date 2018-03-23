alias Instagram.{Posts, Repo}

mock_photos = 9

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

for idx <- 0..mock_photos do
    photo =%{
        image_url: Enum.at(photos_list,idx),
        caption: Faker.Lorem.Shakespeare.hamlet
    }

    %Posts.Photo{}
    |>Posts.Photo.changeset(photo)
    |>Repo.insert!    

end