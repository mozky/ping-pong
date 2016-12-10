package pong.ping.mozky.luis;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.net.MalformedURLException;
import java.net.URL;

public class Adapter extends RecyclerView.Adapter<Adapter.CustomViewHolder> {
    @Override
    public void onBindViewHolder(final Adapter.CustomViewHolder holder, int position) {
        // Replace the contents of a view (invoked by the layout manager)

            // - get element from your dataset at this position
            // - replace the contents of the view with that element
            holder.mTextView.setText(mDataset[position]);

        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                try  {
                    URL newurl;
                    Bitmap mIcon_val;
                    try {
                        newurl = new URL("https://avatars2.githubusercontent.com/u/10691704?v=3&s=400");
                    } catch (MalformedURLException mal){

                        Log.d("EXCEPTION", mal.toString());
                        newurl = null;
                    }


                    try{
                        assert newurl != null;
                        mIcon_val = BitmapFactory.decodeStream(newurl.openConnection() .getInputStream());
                        holder.mImageView.setImageBitmap(mIcon_val);
                    } catch (java.io.IOException ex){
                        holder.mImageView.setImageResource(R.mipmap.ic_launcher);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();

    }

    private String[] mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class CustomViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        private TextView mTextView;
        private View mView;
        private ImageView mImageView;

        public CustomViewHolder(View v) {
            super(v);
            mView = v;
            mTextView = (TextView) v.findViewById(R.id.info_text);
            mImageView = (ImageView) v.findViewById(R.id.thumbnail);
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public Adapter(String[] myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public CustomViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.card_view, null);
        CustomViewHolder viewHolder = new CustomViewHolder(view);
        return viewHolder;
    }


    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}