<?php
    $categories = getAllCategories();
    $categories = json_decode($categories);

    foreach ($categories as $category) {
      echo "<div class='sidebar-left-div' id='cat-$category->id'>
              $category->name
            </div>";
      if ($category->name == 'Surfboards'){ $surfboards_id = $category->id; };
    }

?>
