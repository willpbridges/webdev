defmodule Events.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :description, :string
    field :name, :string
    field :dateTime, :string
    belongs_to :user, Events.Users.User

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:name, :description, :dateTime, :user_id])
    |> validate_required([:name, :description, :dateTime, :user_id])
  end
end
