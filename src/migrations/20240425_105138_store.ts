import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

	ALTER TABLE "store" ADD COLUMN IF NOT EXISTS "apiKey" varchar;

DO $$ BEGIN
 CREATE TYPE "enum_theme_type" AS ENUM('free', 'payment');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_theme_plan" AS ENUM('Starter', 'Growth', 'Professional');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_account_screen_main_section_type" AS ENUM('orders', 'personal_information', 'shipping_address');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_social_media_profiles_title" AS ENUM('instagram', 'facebook', 'twitter', 'whatsApp', 'youTube');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_branding_app_title" AS ENUM('appText', 'applogo');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_bottom_menu_pannel_setting_redirect_page" AS ENUM('home', 'search', 'cart', 'account', 'wishlist', 'categories');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_home_screen_home_data_feature_type" AS ENUM('banner', 'announcement', 'productGroup', 'categories', 'countdown', 'social_channel', 'text_paragraph', 'video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_home_screen_home_data_layout_type" AS ENUM('horizontal', 'vertical', 'horizontal_grid', 'vertical_grid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_announcement_banner_animation_type" AS ENUM('None', 'Left To Right', 'Right To Left');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_banner_data_banner_type" AS ENUM('product', 'category', 'marketing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_store_social_media_account_title" AS ENUM('instagram', 'facebook', 'twitter', 'whatsApp', 'youTube');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "theme" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"industry" varchar,
	"type" "enum_theme_type",
	"price" numeric,
	"plan" "enum_theme_plan",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "theme_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" varchar NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "account_screen_main_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_account_screen_main_section_type",
	"is_visible" boolean
);

CREATE TABLE IF NOT EXISTS "account_screen" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"header_bar_cart" boolean,
	"header_bar_settings" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "empty_cart_screen" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"empty_state_texts_title" varchar,
	"empty_state_texts_subtitle" varchar,
	"empty_state_button_call_to_action_text" varchar,
	"empty_state_button_redirect_to" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "empty_cart_screen_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "product_detail_screen" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"actions_basic_wishlist" boolean,
	"actions_basic_share" boolean,
	"actions_basic_cart" boolean,
	"actions_advanced_rating_and_reviews_is_visible" boolean,
	"actions_advanced_recommendation_is_visible" boolean,
	"actions_advanced_recommendation_content" varchar,
	"actions_advanced_recent_viewed_products_is_visible" boolean,
	"actions_advanced_recent_viewed_products_content" varchar,
	"faster_checkout_buy_now" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "product_detail_screen_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"theme_id" varchar
);

CREATE TABLE IF NOT EXISTS "social_media_profiles" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" "enum_social_media_profiles_title" NOT NULL,
	"profile_url" varchar,
	"is_visible" boolean
);

CREATE TABLE IF NOT EXISTS "social_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"block_title" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "branding" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"app_title" "enum_branding_app_title",
	"app_title_text_app_name" varchar,
	"app_title_text_app_name_text_colour" varchar,
	"launch_screen_bg_color" varchar,
	"header_footer_bg_color" varchar,
	"header_footer_icon_color" varchar,
	"primary_body_bg_color" varchar,
	"primary_btn_bg_color" varchar,
	"primary_btn_text_color" varchar,
	"label_bg_color" varchar,
	"label_text_color" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "branding_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"theme_id" varchar,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"video_url" varchar,
	"mute" boolean,
	"auto_play" boolean,
	"full_width" boolean,
	"loop" boolean,
	"show_playback" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "text_paragraph" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "event_timer" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"text_color" varchar,
	"bg_color" varchar,
	"duration_days" numeric,
	"duration_hours" numeric,
	"duration_minutes" numeric,
	"start_time_date" timestamp(3) with time zone,
	"start_time_time" timestamp(3) with time zone,
	"start_time_time_zone" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "bottom_menu_pannel_setting" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"redirect_page" "enum_bottom_menu_pannel_setting_redirect_page" NOT NULL
);

CREATE TABLE IF NOT EXISTS "bottom_menu_pannel" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "bottom_menu_pannel_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"theme_id" varchar
);

CREATE TABLE IF NOT EXISTS "home_screen_home_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"is_visible" boolean,
	"featureType" "enum_home_screen_home_data_feature_type" NOT NULL,
	"layoutType" "enum_home_screen_home_data_layout_type" NOT NULL
);

CREATE TABLE IF NOT EXISTS "home_screen" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "home_screen_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"theme_id" varchar,
	"announcement_banner_id" integer,
	"banner_id" integer,
	"categories_id" integer,
	"product_group_id" integer,
	"event_timer_id" integer,
	"social_media_id" integer,
	"text_paragraph_id" integer,
	"video_id" integer
);

CREATE TABLE IF NOT EXISTS "announcement_banner" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar,
	"text_color" varchar,
	"background_color" varchar,
	"animationType" "enum_announcement_banner_animation_type",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "banner_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"is_visible" boolean,
	"bannerType" "enum_banner_data_banner_type" NOT NULL,
	"action_url" varchar
);

CREATE TABLE IF NOT EXISTS "banner" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "banner_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "product_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"product_group_id" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"image_url" varchar,
	"collection_id" varchar
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
	"id" varchar PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"shop_domain" varchar NOT NULL,
	"shop_id" varchar NOT NULL,
	"is_online" boolean NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "store_social_media_account" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" "enum_store_social_media_account_title" NOT NULL,
	"profile_url" varchar,
	"is_visible" boolean
);

CREATE TABLE IF NOT EXISTS "store" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_id" varchar NOT NULL,
	"shop_name" varchar NOT NULL,
	"shopify_domain" varchar NOT NULL,
	"owner" varchar,
	"email" varchar,
	"theme_id" varchar,
	"storefront_access_token" varchar,
	"is_active" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "theme_created_at_idx" ON "theme" ("created_at");
CREATE INDEX IF NOT EXISTS "theme_rels_order_idx" ON "theme_rels" ("order");
CREATE INDEX IF NOT EXISTS "theme_rels_parent_idx" ON "theme_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "theme_rels_path_idx" ON "theme_rels" ("path");
CREATE INDEX IF NOT EXISTS "account_screen_main_section_order_idx" ON "account_screen_main_section" ("_order");
CREATE INDEX IF NOT EXISTS "account_screen_main_section_parent_id_idx" ON "account_screen_main_section" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "account_screen_main_section_type_idx" ON "account_screen_main_section" ("type");
CREATE INDEX IF NOT EXISTS "account_screen_created_at_idx" ON "account_screen" ("created_at");
CREATE INDEX IF NOT EXISTS "empty_cart_screen_created_at_idx" ON "empty_cart_screen" ("created_at");
CREATE INDEX IF NOT EXISTS "empty_cart_screen_rels_order_idx" ON "empty_cart_screen_rels" ("order");
CREATE INDEX IF NOT EXISTS "empty_cart_screen_rels_parent_idx" ON "empty_cart_screen_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "empty_cart_screen_rels_path_idx" ON "empty_cart_screen_rels" ("path");
CREATE INDEX IF NOT EXISTS "product_detail_screen_created_at_idx" ON "product_detail_screen" ("created_at");
CREATE INDEX IF NOT EXISTS "product_detail_screen_rels_order_idx" ON "product_detail_screen_rels" ("order");
CREATE INDEX IF NOT EXISTS "product_detail_screen_rels_parent_idx" ON "product_detail_screen_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "product_detail_screen_rels_path_idx" ON "product_detail_screen_rels" ("path");
CREATE INDEX IF NOT EXISTS "social_media_profiles_order_idx" ON "social_media_profiles" ("_order");
CREATE INDEX IF NOT EXISTS "social_media_profiles_parent_id_idx" ON "social_media_profiles" ("_parent_id");
CREATE INDEX IF NOT EXISTS "social_media_created_at_idx" ON "social_media" ("created_at");
CREATE INDEX IF NOT EXISTS "branding_created_at_idx" ON "branding" ("created_at");
CREATE INDEX IF NOT EXISTS "branding_rels_order_idx" ON "branding_rels" ("order");
CREATE INDEX IF NOT EXISTS "branding_rels_parent_idx" ON "branding_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "branding_rels_path_idx" ON "branding_rels" ("path");
CREATE INDEX IF NOT EXISTS "video_created_at_idx" ON "video" ("created_at");
CREATE INDEX IF NOT EXISTS "text_paragraph_created_at_idx" ON "text_paragraph" ("created_at");
CREATE INDEX IF NOT EXISTS "event_timer_created_at_idx" ON "event_timer" ("created_at");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_setting_order_idx" ON "bottom_menu_pannel_setting" ("_order");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_setting_parent_id_idx" ON "bottom_menu_pannel_setting" ("_parent_id");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_created_at_idx" ON "bottom_menu_pannel" ("created_at");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_rels_order_idx" ON "bottom_menu_pannel_rels" ("order");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_rels_parent_idx" ON "bottom_menu_pannel_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "bottom_menu_pannel_rels_path_idx" ON "bottom_menu_pannel_rels" ("path");
CREATE INDEX IF NOT EXISTS "home_screen_home_data_order_idx" ON "home_screen_home_data" ("_order");
CREATE INDEX IF NOT EXISTS "home_screen_home_data_parent_id_idx" ON "home_screen_home_data" ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_screen_created_at_idx" ON "home_screen" ("created_at");
CREATE INDEX IF NOT EXISTS "home_screen_rels_order_idx" ON "home_screen_rels" ("order");
CREATE INDEX IF NOT EXISTS "home_screen_rels_parent_idx" ON "home_screen_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "home_screen_rels_path_idx" ON "home_screen_rels" ("path");
CREATE INDEX IF NOT EXISTS "announcement_banner_created_at_idx" ON "announcement_banner" ("created_at");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "banner_data_order_idx" ON "banner_data" ("_order");
CREATE INDEX IF NOT EXISTS "banner_data_parent_id_idx" ON "banner_data" ("_parent_id");
CREATE INDEX IF NOT EXISTS "banner_created_at_idx" ON "banner" ("created_at");
CREATE INDEX IF NOT EXISTS "banner_rels_order_idx" ON "banner_rels" ("order");
CREATE INDEX IF NOT EXISTS "banner_rels_parent_idx" ON "banner_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "banner_rels_path_idx" ON "banner_rels" ("path");
CREATE INDEX IF NOT EXISTS "product_group_created_at_idx" ON "product_group" ("created_at");
CREATE INDEX IF NOT EXISTS "categories_data_order_idx" ON "categories_data" ("_order");
CREATE INDEX IF NOT EXISTS "categories_data_parent_id_idx" ON "categories_data" ("_parent_id");
CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" ("created_at");
CREATE INDEX IF NOT EXISTS "session_created_at_idx" ON "session" ("created_at");
CREATE INDEX IF NOT EXISTS "store_social_media_account_order_idx" ON "store_social_media_account" ("_order");
CREATE INDEX IF NOT EXISTS "store_social_media_account_parent_id_idx" ON "store_social_media_account" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "store_shop_id_idx" ON "store" ("shop_id");
CREATE INDEX IF NOT EXISTS "store_created_at_idx" ON "store" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "theme_rels" ADD CONSTRAINT "theme_rels_parent_id_theme_id_fk" FOREIGN KEY ("parent_id") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "theme_rels" ADD CONSTRAINT "theme_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "account_screen_main_section" ADD CONSTRAINT "account_screen_main_section__parent_id_account_screen_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "account_screen"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "empty_cart_screen_rels" ADD CONSTRAINT "empty_cart_screen_rels_parent_id_empty_cart_screen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "empty_cart_screen"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "empty_cart_screen_rels" ADD CONSTRAINT "empty_cart_screen_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_detail_screen_rels" ADD CONSTRAINT "product_detail_screen_rels_parent_id_product_detail_screen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "product_detail_screen"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_detail_screen_rels" ADD CONSTRAINT "product_detail_screen_rels_theme_id_theme_id_fk" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "social_media_profiles" ADD CONSTRAINT "social_media_profiles__parent_id_social_media_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "social_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "branding_rels" ADD CONSTRAINT "branding_rels_parent_id_branding_id_fk" FOREIGN KEY ("parent_id") REFERENCES "branding"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "branding_rels" ADD CONSTRAINT "branding_rels_theme_id_theme_id_fk" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "branding_rels" ADD CONSTRAINT "branding_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "bottom_menu_pannel_setting" ADD CONSTRAINT "bottom_menu_pannel_setting__parent_id_bottom_menu_pannel_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "bottom_menu_pannel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "bottom_menu_pannel_rels" ADD CONSTRAINT "bottom_menu_pannel_rels_parent_id_bottom_menu_pannel_id_fk" FOREIGN KEY ("parent_id") REFERENCES "bottom_menu_pannel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "bottom_menu_pannel_rels" ADD CONSTRAINT "bottom_menu_pannel_rels_theme_id_theme_id_fk" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_home_data" ADD CONSTRAINT "home_screen_home_data__parent_id_home_screen_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_screen"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_parent_id_home_screen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "home_screen"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_theme_id_theme_id_fk" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_announcement_banner_id_announcement_banner_id_fk" FOREIGN KEY ("announcement_banner_id") REFERENCES "announcement_banner"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_banner_id_banner_id_fk" FOREIGN KEY ("banner_id") REFERENCES "banner"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_product_group_id_product_group_id_fk" FOREIGN KEY ("product_group_id") REFERENCES "product_group"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_event_timer_id_event_timer_id_fk" FOREIGN KEY ("event_timer_id") REFERENCES "event_timer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_social_media_id_social_media_id_fk" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_text_paragraph_id_text_paragraph_id_fk" FOREIGN KEY ("text_paragraph_id") REFERENCES "text_paragraph"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_screen_rels" ADD CONSTRAINT "home_screen_rels_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "banner_data" ADD CONSTRAINT "banner_data__parent_id_banner_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "banner"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "banner_rels" ADD CONSTRAINT "banner_rels_parent_id_banner_id_fk" FOREIGN KEY ("parent_id") REFERENCES "banner"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "banner_rels" ADD CONSTRAINT "banner_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "categories_data" ADD CONSTRAINT "categories_data__parent_id_categories_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "store_social_media_account" ADD CONSTRAINT "store_social_media_account__parent_id_store_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "store"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "session" DROP COLUMN IF EXISTS "apiKey" varchar;


`
)};
