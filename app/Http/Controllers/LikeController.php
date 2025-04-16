<?php

namespace App\Http\Controllers;

use App\Models\Post;

class LikeController extends Controller
{
  public function store(Post $post)
  {
    $post->likes()->firstOrCreate([
      "user_id" => auth()->id(),
    ]);

    return response()->json(['message' => 'Like registered!']);
  }

  public function destroy(Post $post)
  {
    $post->likes()->where("user_id", auth()->id())->delete();

    return back()->with('success', 'Like deleted!');
  }

}
