import { AddReviewButton } from "./AddReviewButton";
import { handleReviewFormAction } from "@/app/product/[productId]/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type ReviewFormProps = {
	productId: string;
};

export function ReviewForm({ productId }: ReviewFormProps) {
	return (
		<form action={handleReviewFormAction} data-testid="add-review-form">
			<input type="text" name="productId" value={productId} readOnly hidden />
			<Label htmlFor="headline" className="text-md mb-1 block">
				Headline
			</Label>
			<Input className="mb-2" type="text" name="headline" id="headline" required />
			<Label htmlFor="content" className="text-md mb-1 block">
				Content
			</Label>
			<Input className="mb-2" type="text" name="content" id="content" required />
			<Label htmlFor="rating" className="text-md mb-1 block">
				Rating
			</Label>
			<Input className="mb-2" type="number" name="rating" id="rating" min={0} max={5} required />
			<Label htmlFor="username" className="text-md mb-1 block">
				Username
			</Label>
			<Input className="mb-2" type="text" name="username" id="username" required />
			<Label htmlFor="email" className="text-md mb-1 block">
				Email
			</Label>
			<Input className="mb-2" type="email" name="email" id="email" required />

			<AddReviewButton />
		</form>
	);
}
