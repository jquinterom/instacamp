<?php

namespace App\Http\Controllers;

use App\Models\Post;

class LikeController extends Controller
{

  public function store(Post $post)
  {
    if ($post->likes()->where('user_id', auth()->id())->exists()) {
      return response()->json(['message' => 'Ya has dado like a este post'], 409);
    }

    $like = $post->likes()->create([
      "user_id" => auth()->id(),
    ]);

    return response()->json([
      'message' => 'Like registrado!',
      'like' => $like,
      'likes_count' => $post->likes()->count()
    ]);
  }


  public function destroy(Post $post)
  {
    $post->likes()->where("user_id", auth()->id())->delete();

    return back()->with('message', 'Like deleted!');
  }

}
