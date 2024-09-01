CREATE TABLE IF NOT EXISTS "ivcota-stack_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"user_id" uuid,
	CONSTRAINT "ivcota-stack_leads_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ivcota-stack_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ivcota-stack_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "ivcota-stack_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ivcota-stack_leads" ADD CONSTRAINT "ivcota-stack_leads_user_id_ivcota-stack_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ivcota-stack_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ivcota-stack_sessions" ADD CONSTRAINT "ivcota-stack_sessions_user_id_ivcota-stack_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ivcota-stack_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
