# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Events.Repo.insert!(%Events.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Events.Repo
alias Events.Users.User
alias Events.Posts.Post

alice = Repo.insert!(%User{name: "alice", email: "alice@gmail.com"})
bob = Repo.insert!(%User{name: "bob", email: "bob@gmail.com"})

Repo.insert!(%Post{
  user_id: alice.id,
  name: "You're Invited!",
  description: "Come to my birthday party!",
  dateTime: "2021-03-03 12:00"
})

Repo.insert!(%Post{
  user_id: bob.id,
  name: "Brazil!",
  description: "Come to brazil!",
  dateTime: "2021-03-03 12:00"
})
