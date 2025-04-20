<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{

  public function store(Request $request, Post $post)
  {
    $data = $request->validate([
      "comment" => "required|max:255",
    ]);

    $post->comments()->create([
      "comment" => $data["comment"],
      "user_id" => auth()->id(),
    ]);

    return to_route('post.show', $post);
  }

  public function destroy(Comment $comment)
  {
    if (auth()->id() !== $comment->user_id && auth()->id() !== $comment->post->user_id) {
      abort(403, "Unauthorized action.");
    }

    $postId = $comment->post_id;
    $comment->delete();

    // return redirect()->route("/posts/" . $postId);
    return to_route("post.show", $postId);
  }
}
