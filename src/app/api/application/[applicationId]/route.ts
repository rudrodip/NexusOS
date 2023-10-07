import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { applicationPatchSchema } from "@/lib/validations/application"

const routeContextSchema = z.object({
  params: z.object({
    applicationId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.applicationId))) {
      return new Response(null, { status: 403 })
    }

    await db.application.delete({
      where: {
        id: params.applicationId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.applicationId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = applicationPatchSchema.parse(json)

    await db.application.update({
      where: {
        id: params.applicationId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(applicationId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.application.count({
    where: {
      id: applicationId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}

async function verifyCurrentUserHasAccessToPatch(applicationId: string) {
  const session = await getServerSession(authOptions);

  // Fetch the application and its associated project
  const application = await db.application.findFirst({
    where: {
      id: applicationId,
    },
    include: {
      project: true,
    },
  });

  // Check if the application exists and if the authorId of the project matches the user.id
  if (application && application.project && application.project.authorId === session?.user.id) {
    return true;
  }

  return false;
}