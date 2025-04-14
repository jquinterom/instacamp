<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class ProfileController extends Controller
{
  public function index($user)
  {
    $user = User::findOrFail($user)->with(["posts", "likes", "comments"])->first();

    return inertia::render(
      component: 'profile/index',
      props: ['user' => $user],
    );
  }

  public function edit(User $user)
  {
    if (auth()->id() !== $user->id) {
      // abort(403, "Unauthorized action.");
      return Redirect::back()->with('error', 'Unauthorized action.');
    }

    return view("profile.edit", compact("user"));
  }

  public function update(Request $request, User $user)
  {
    if (auth()->id() !== $user->id) {
      abort(403, "Unauthorized action.");
    }

    $data = $request->validate([
      "name" => "required",
      "username" => "required",
      "bio" => "nullable",
      "profile_image" => "image|nullable|mimes:jpeg,png,jpg,gif|max:2048",
    ]);

    if ($request->hasFile("profile_image")) {
      if ($user->profile_image) {
        Storage::disk("public")->delete($user->profile_image);
      }

      $imagePath = $request->file("profile_image")->store("profile", "public");
      $data["profile_image"] = $imagePath;

      $user->update($data);

      return redirect()->route("/profile/{$user->id}");
    }
  }
}
