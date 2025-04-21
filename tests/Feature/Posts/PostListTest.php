<?php

use App\Models\Post;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('list of posts is displayed', function () {
  $user = User::factory()->create();
  $posts = Post::factory()->count(2)->create();

  $response = $this
    ->actingAs($user)
    ->get('/posts');

  $response->assertOk();

  $posts->each(function ($post) use ($response) {
    $response->assertSee($post->caption);
    $response->assertSee($post->image_path);
  });
});