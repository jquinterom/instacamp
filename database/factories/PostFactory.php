<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'caption' => fake()->sentence(),
      'image_path' => fake()->text(),
      'user_id' => User::factory()->create()->id,
      'id' => fake()->randomNumber(),
    ];
  }


}