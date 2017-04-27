<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1f7b23c1e44714d6e313fc8b386ac0e2
{
    public static $prefixLengthsPsr4 = array (
        'L' => 
        array (
            'LLMS\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'LLMS\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1f7b23c1e44714d6e313fc8b386ac0e2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1f7b23c1e44714d6e313fc8b386ac0e2::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
